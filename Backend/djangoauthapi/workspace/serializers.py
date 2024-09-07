from rest_framework import serializers
from workspace.models import Workspace,Project

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields='__all__'
        extra_kwargs = {"owner": {"read_only": True}}
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields ='__all__'
        
# serializer for workspace dropdown
class WorkspaceDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['id', 'name']