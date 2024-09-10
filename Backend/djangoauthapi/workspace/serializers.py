from rest_framework import serializers
from workspace.models import Workspace,Project,Task

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
  

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {
            'assigned_user': {'required': True, 'allow_null': False}  # Ensures assigned_user is required and cannot be null
        }
    
    def validate(self, data):
        # Ensure the assigned user is a member of the workspace associated with the project
        project = data.get('project')
        assigned_user = data.get('assigned_user')
        
        # Ensure assigned_user is not None
        if assigned_user is None:
            raise serializers.ValidationError("Assigned user is required.")

        if assigned_user and project:
            workspace = project.workspace
            if assigned_user not in workspace.members.all():
                raise serializers.ValidationError("Assigned user must be a member of the workspace.")

        return data   
