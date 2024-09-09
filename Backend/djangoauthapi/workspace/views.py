from rest_framework import viewsets
from workspace.models import Workspace,Project
from workspace.serializers import WorkspaceSerializer, ProjectSerializer, WorkspaceDropdownSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from account.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

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