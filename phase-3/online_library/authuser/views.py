from django.http import JsonResponse
from .serializers import UserSerializer
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def users(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        response = {"Message": "200 OK", "status": 200, "body": serializer.data}
        return JsonResponse(response)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = UserSerializer(data=data)
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
def user(request, id):
    try:
        user = CustomUser.objects.get(pk=id)
    except CustomUser.DoesNotExist:
        response = {"Message": "404 Not Found", "status": 404}
        return JsonResponse(response, status=404)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        response = {"Message": "200 OK", "status": 200, "body": serializer.data}
        return JsonResponse(response)
    
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            serializer = UserSerializer(user, data=data)
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
        user.delete()
        response = {"Message": "200 OK", "status": 200}
        return JsonResponse(response)

    response = {"Message": "404 Not Found", "status": 404}
    return JsonResponse(response, status=404)

@csrf_exempt
def login(request):        
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user = CustomUser.objects.get(email=data["email"], password=data["password"])
            if user is not None:
                userData = UserSerializer(user).data
                data = {
                        "first_name": userData["first_name"],
                        "is_staff": userData["is_staff"]
                        }
                response = {"Message": "200 OK", "status": 200, "body": data}
                return JsonResponse(response)
            else:
                response = {"Message": "400 Bad Request", "status": 400, "errors": "Invalid user or password"}
                return JsonResponse(response)
        except Exception:
            response = {"Message": "400 Bad Request", "status": 400, "errors": "Invalid user or password"}
            return JsonResponse(response, status=400)
    else:
        response = {"Message": "405 Method Not Allowed", "status": 405}
        return JsonResponse(response, status=405)