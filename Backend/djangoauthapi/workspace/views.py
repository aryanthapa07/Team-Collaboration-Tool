from rest_framework import viewsets
from workspace.models import Workspace,Project,Task
from workspace.serializers import WorkspaceSerializer, ProjectSerializer, WorkspaceDropdownSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from account.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q

# View for workspace management
class WorkspaceViewSet(viewsets.ModelViewSet):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]
    
    # Adding a custom action to fetch workspace names for the dropdown
    @action(detail=False, methods=['get'])
    def dropdown(self, request):
        user = self.request.user
        workspaces = Workspace.objects.filter(owner=user)
        serializer = WorkspaceDropdownSerializer(workspaces, many=True)
        return Response(serializer.data)
    
    def get_queryset(self):
        # only returns workspace that belongs to the authenticated user
        user=self.request.user
        # Return workspaces the user owns or is a member of
        return Workspace.objects.filter(Q(owner=user) | Q(members=user)).distinct()
    
    def perform_create(self,serializer):\
        # Automatically set the owner to the current user when creating a workspace
        serializer.save(owner=self.request.user)
        
    def perform_update(self, serializer):
        # Allow only the owner to update
        workspace = self.get_object()
        if workspace.owner != self.request.user:
            raise PermissionDenied("You are not allowed to edit this workspace.")
        serializer.save()
    
    def perform_destroy(self, instance):
        # Allow only the owner to delete
        if instance.owner != self.request.user:
            raise PermissionDenied("You are not allowed to delete this workspace.")
        instance.delete()

# View for Project Management
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return projects within the workspaces owned by the authenticated user
        user = self.request.user
        return Project.objects.filter(Q(workspace__owner=user) | Q(workspace__members=user))

    def perform_create(self, serializer):
        # Check if the current user is the owner of the workspace
        workspace = serializer.validated_data['workspace']
        if workspace.owner != self.request.user:
            raise PermissionDenied("You are not the owner of this workspace.")
        # Save the project with the workspace if the user is the owner
        serializer.save()
    
    def perform_update(self, serializer):
        project = self.get_object()
        if project.workspace.owner != self.request.user:
            raise PermissionDenied("You are not allowed to edit this project.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.workspace.owner != self.request.user:
            raise PermissionDenied("You are not allowed to delete this project.")
        instance.delete()
        

# View for Task Management
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return tasks within the projects of the workspaces owned by the user
        return Task.objects.filter(Q(project__workspace__owner=user) | Q(assigned_user=user))

    def perform_create(self, serializer):
        user = self.request.user
        project = serializer.validated_data['project']
        
        # Ensure that the user is the owner of the workspace associated with the project
        if project.workspace.owner != user:
            raise PermissionDenied("You are not authorized to create tasks in this project.")
        
        serializer.save()
        
    @action(detail=False, methods=['get'], url_path='workspace-members/(?P<project_id>[^/.]+)')
    def get_workspace_members(self, request, project_id=None):
        try:
            project = Project.objects.get(id=project_id)
            workspace = project.workspace
            members = workspace.members.all()
            member_data = [{'id': member.id, 'name': member.name} for member in members]  # Assuming 'username' is the field for user names
            return Response(member_data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

    @action(detail=False, methods=['get'], url_path='my-projects')
    def get_user_projects(self, request):
        user = request.user
        projects = Project.objects.filter(workspace__owner=user)
        project_data = [{'id': project.id, 'name': project.name} for project in projects]
        return Response(project_data)