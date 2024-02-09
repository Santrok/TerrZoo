from rest_framework import serializers

from error_management.models import StyledComponents
from main.models import Animal, CategoryProduct, Product, CountItemProduct, Sale, Article, Brand, Review, Order


class StyledComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyledComponents
        fields = ["style", "css_class_name"]


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = "__all__"


class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryProduct
        fields = ['name', 'parent', 'animal']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CountItemProductSerializer(serializers.Serializer):
    class Meta:
        model = CountItemProduct
        fields = '__all__'


class ArticleSerializer(serializers.Serializer):
    class Meta:
        model = Article
        fields = '__all__'


class SaleSerializer(serializers.Serializer):
    class Meta:
        model = Sale
        fields = '__all__'


class BrandSerializer(serializers.Serializer):
    class Meta:
        model = Brand
        fields = '__all__'


class ReviewSerializer(serializers.Serializer):
    class Meta:
        model = Review
        fields = '__all__'


class OrderSerializer(serializers.Serializer):
    class Meta:
        model = Order
        fields = '__all__'
