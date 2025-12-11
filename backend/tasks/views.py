from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for managing tasks.
    """
    
    def list(self, request):
        """
        GET /tasks/
        List all tasks
        """
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        """
        POST /tasks/
        Create a new task
        """
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        """
        GET /tasks/{id}/
        Retrieve a task by ID
        """
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        """
        PUT /tasks/{id}/
        Update a task (title & description)
        """
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Only allow updating title and description for PUT
        data = request.data.copy()
        if 'completed' in data:
            del data['completed']  # Don't allow completed updates via PUT
        
        serializer = TaskSerializer(task, data=data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['patch'])
    def toggle_completed(self, request, pk=None):
        """
        PATCH /tasks/{id}/toggle_completed/
        Toggle task completed status only
        """
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Toggle the completed status
        task.completed = not task.completed
        task.save()
        
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        """
        DELETE /tasks/{id}/
        Delete a task
        """
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def partial_update(self, request, pk=None):
        """
        PATCH /tasks/{id}/
        Alternative way to toggle completed
        """
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if only completed field is being updated
        if 'completed' in request.data and len(request.data) == 1:
            task.completed = request.data['completed']
            task.save()
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'PATCH can only be used to update completed status'},
                status=status.HTTP_400_BAD_REQUEST
            )