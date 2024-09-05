from rest_framework import viewsets
from workspace.models import Workspace,Project
from workspace.serializers import WorkspaceSerializer, ProjectSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from account.models import User

class WorkspaceViewSet(viewsets.ModelViewSet):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]
    
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

