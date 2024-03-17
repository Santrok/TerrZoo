from django.db.models.signals import post_save
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.core.mail import send_mail

from config import settings
from config.settings import env_keys
from .models import Profile, Sale, Article

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except ObjectDoesNotExist:
        Profile.objects.create(user=instance)


# добавить reverse для акций, чтобы актуальные отображались в первую очередь?
@receiver(post_save, sender=Sale)
def sent_email(sender, instance, created, **kwargs):
    profiles = Profile.objects.filter(subscribe=True)
    for profile in profiles:
        if created:
            send_mail(
                subject=f'Добрый день, {profile.user}, у нас есть новости для Вас!',
                message=f'Новая акция: {env_keys.get("URL")}/promotions/',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[profile.user.email])


@receiver(post_save, sender=Article)
def sent_email(sender, instance, created, **kwargs):
    profiles = Profile.objects.filter(subscribe=True)
    for profile in profiles:
        if created:
            send_mail(
                subject=f'Добрый день, {profile.user}, у нас есть новости для Вас!',
                message=f'Новая статья: {env_keys.get("URL")}/article/{Article.objects.latest("id").id}',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[profile.user.email])
