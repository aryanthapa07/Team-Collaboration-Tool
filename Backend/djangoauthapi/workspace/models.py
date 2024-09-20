from django.db import models
from account.models import User
# workspace model
class Workspace(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True,null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_workspaces')
    members = models.ManyToManyField(User, related_name='workspaces')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
# projects model  
class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True,null=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# tasks model
class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    assigned_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='tasks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    deadline = models.DateTimeField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    