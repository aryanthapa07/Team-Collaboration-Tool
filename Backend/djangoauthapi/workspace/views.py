from rest_framework import viewsets
from workspace.models import Workspace,Project
from workspace.serializers import WorkspaceSerializer, ProjectSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny

class WorkspaceViewSet(viewsets.ModelViewSet):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [AllowAny]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
