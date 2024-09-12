from rest_framework import serializers
from workspace.models import Workspace,Project,Task

class WorkspaceSerializer(serializers.ModelSerializer):
    owner_name = serializers.ReadOnlyField(source='owner.name')  # Get owner's name
    members_names = serializers.SerializerMethodField()  # Get members' names

    class Meta:
        model = Workspace
        fields = ['id', 'name', 'description', 'owner', 'owner_name', 'members', 'members_names', 'created_at']
        extra_kwargs = {"owner": {"read_only": True}}

    def get_members_names(self, obj):
        return [member.name for member in obj.members.all()]
        
class ProjectSerializer(serializers.ModelSerializer):
    workspace_name = serializers.CharField(source='workspace.name', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'workspace', 'workspace_name', 'created_at']
        
# serializer for workspace dropdown
class WorkspaceDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['id', 'name']
  

class TaskSerializer(serializers.ModelSerializer):
    assigned_user_name = serializers.SerializerMethodField()
    project_name = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'assigned_user', 'assigned_user_name', 'status', 'deadline', 'project', 'project_name']
    
    def get_assigned_user_name(self, obj):
        return obj.assigned_user.name if obj.assigned_user else None
    
    def get_project_name(self, obj):
        return obj.project.name if obj.project else None
    
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
