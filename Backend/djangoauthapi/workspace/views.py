from rest_framework import viewsets
from workspace.models import Workspace,Project,Task
from workspace.serializers import WorkspaceSerializer, ProjectSerializer, WorkspaceDropdownSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from account.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

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
        return Workspace.objects.filter(owner=user)
    
    def perform_create(self,serializer):\
        # Automatically set the owner to the current user when creating a workspace
        serializer.save(owner=self.request.user)

# View for Project Management
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return projects within the workspaces owned by the authenticated user
        user = self.request.user
        return Project.objects.filter(workspace__owner=user)

    def perform_create(self, serializer):
        # Check if the current user is the owner of the workspace
        workspace = serializer.validated_data['workspace']
        if workspace.owner != self.request.user:
            raise PermissionDenied("You are not the owner of this workspace.")
        
        # Save the project with the workspace if the user is the owner
        serializer.save()
        

# View for Task Management
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return tasks within the projects of the workspaces owned by the user
        return Task.objects.filter(project__workspace__owner=user)

    def perform_create(self, serializer):
        user = self.request.user
        project = serializer.validated_data['project']
        
        # Ensure that the user is the owner of the workspace associated with the project
        if project.workspace.owner != user:
            raise PermissionDenied("You are not authorized to create tasks in this project.")
        
        serializer.save()
        
    @action(detail=True, methods=['get'], url_path='workspace-members')
    def get_workspace_members(self, request, pk=None):
        project = self.get_object()
        workspace = project.workspace
        members = workspace.members.all()
        member_data = [{'id': member.id, 'name': member.username} for member in members]  # Assuming 'username' is the field for user names
        return Response(member_data)

    @action(detail=False, methods=['get'], url_path='my-projects')
    def get_user_projects(self, request):
        user = request.user
        projects = Project.objects.filter(workspace__owner=user)
        project_data = [{'id': project.id, 'name': project.name} for project in projects]
        return Response(project_data)