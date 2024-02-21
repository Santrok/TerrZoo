from django.db.models.signals import post_save
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .models import Profile


User = get_user_model()

'''Этот обработчик сигнала будет вызываться, когда объект User сохраняется (после создания или обновления).
Внутри обработчика проверяется аргумент created, который указывает, был ли объект User только что создан.
Если created равно True, то значит объект User был только что создан, и внутри обработчика создается объект
Profile с атрибутом user, равным созданному объекту User'''


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


'''Этот обработчик сигнала будет вызываться, когда объект User сохраняется (после создания или обновления).
Внутри обработчика вызывается метод save() на объекте Profile, связанном с объектом User'''


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except ObjectDoesNotExist:
        Profile.objects.create(user=instance)
