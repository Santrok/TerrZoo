from django.shortcuts import render
from rest_framework.generics import ListAPIView

from api.serializers import StyledComponentsSerializer, AnimalSerializer, CategoryProductSerializer, ProductSerializer, \
    CountItemProductSerializer, SaleSerializer, ArticleSerializer, BrandSerializer, ReviewSerializer, OrderSerializer, \
    LinkComponentsSerializer
from error_management.models import StyledComponents,  SetErrorLink
from main.models import Animal, CategoryProduct, Product, CountItemProduct, Sale, Article, Brand, Review, Order


# Create your views here.
class StyledComponentsListView(ListAPIView):
    queryset = StyledComponents.objects.filter(is_active=True)
    serializer_class = StyledComponentsSerializer

class LinkComponentsListView(ListAPIView):
    queryset =SetErrorLink.objects.filter(is_active=True)
    serializer_class = LinkComponentsSerializer

class AnimalsListView(ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


class CategoryProductsListView(ListAPIView):
    queryset = CategoryProduct.objects.all()
    serializer_class = CategoryProductSerializer


class ProductsListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CountItemProductsListView(ListAPIView):
    queryset = CountItemProduct.objects.all()
    serializer_class = CountItemProductSerializer


class SaleListView(ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class ArticlesListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class BrandsListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ReviewsListView(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class OrdersListView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
