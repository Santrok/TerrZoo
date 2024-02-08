from rest_framework import serializers

from main.models import StyledComponents


class StyledComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyledComponents
        fields = ["style", "css_class_name"]
