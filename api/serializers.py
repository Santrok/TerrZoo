from rest_framework import serializers

from error_management.models import StyledComponents, SetErrorLink
from main.models import Animal, CategoryProduct, Product, CountItemProduct, Sale, Article, Brand, Review, Order


class StyledComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyledComponents
        fields = ["style", "css_class_name"]

class LinkComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetErrorLink
        fields = ["href", "html_id_tag_a"]

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
        depth=2



class CountItemProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountItemProduct
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
