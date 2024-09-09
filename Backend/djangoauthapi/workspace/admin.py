from django.contrib import admin
from workspace.models import Workspace, Project , Task
# Register your models here.
admin.site.register(Workspace)
admin.site.register(Project)
admin.site.register(Task)