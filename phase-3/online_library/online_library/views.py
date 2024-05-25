from django.http import JsonResponse

def home(request):
    if request.method == 'GET':
        response = {
            "status":"200",
            "message":"Please enter endpoint"
        }
    return JsonResponse(response)