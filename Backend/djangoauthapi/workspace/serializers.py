from rest_framework import serializers
from workspace.models import Workspace,Project

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields='__all__'
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields ='__all__'