import json
from django.http import JsonResponse
from django.shortcuts import render

from manager_tasks.models import Callback


def save_callback(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name_user = data.get('name_user')
            phone_number_user = data.get('phone_number_user')

            if name_user == '' or phone_number_user == '':
                raise ValueError("Некорректные данные")

            data_callback = Callback.objects.create(user=name_user, phone_number_user=phone_number_user)
            return JsonResponse({'message': 'Данные успешно получены'})
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Ошибка при декодировании JSON'}, status=400)
        except ValueError as e:
            return JsonResponse({'message': str(e)}, status=400)
    else:
        return JsonResponse({'message': 'Метод не разрешен'}, status=405)
