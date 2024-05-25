from django.http import JsonResponse
from .serializers import BookSerializer
from .models import Book
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def books(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        response = {"Message": "200 OK", "status": 200, "body": serializer.data}
        return JsonResponse(response)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = BookSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                response = {"Message": "201 Created", "status": 201}
                return JsonResponse(response)
            else:
                response = {"Message": "400 Bad Request", "status": 400, "errors": serializer.errors}
                return JsonResponse(response, status=400)
        except json.JSONDecodeError:
            response = {"Message": "400 Bad Request", "status": 400, "errors": "Invalid JSON format"}
            return JsonResponse(response, status=400)

    response = {"Message": "404 Not Found", "status": 404}
    return JsonResponse(response, status=404)

@csrf_exempt
def book(request, id):
    try:
        book = Book.objects.get(pk=id)
    except Book.DoesNotExist:
        response = {"Message": "404 Not Found", "status": 404}
        return JsonResponse(response, status=404)
    
    if request.method == 'GET':
        serializer = BookSerializer(book)
        response = {"Message": "200 OK", "status": 200, "body": serializer.data}
        return JsonResponse(response)
    
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            serializer = BookSerializer(book, data=data)
            if serializer.is_valid():
                serializer.save()
                response = {"Message": "200 OK", "status": 200, "body": serializer.data}
                return JsonResponse(response)
            else:
                response = {"Message": "400 Bad Request", "status": 400, "errors": serializer.errors}
                return JsonResponse(response, status=400)
        except json.JSONDecodeError:
            response = {"Message": "400 Bad Request", "status": 400, "errors": "Invalid JSON format"}
            return JsonResponse(response, status=400)

    if request.method == "DELETE":
        book.delete()
        response = {"Message": "200 OK", "status": 200}
        return JsonResponse(response)

    response = {"Message": "404 Not Found", "status": 404}
    return JsonResponse(response, status=404)
