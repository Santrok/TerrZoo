from collections import OrderedDict

from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

from rest_framework.response import Response
from django.forms.models import model_to_dict
from api.serializers import StyledComponentsSerializer, AnimalSerializer, CategoryProductSerializer, ProductSerializer, \
    CountItemProductSerializer, SaleSerializer, ArticleSerializer, BrandSerializer, ReviewSerializer, OrderSerializer, \
    LinkComponentsSerializer
from error_management.models import StyledComponents, SetErrorLink, SetErrorDataApiV1
from main.models import Animal, CategoryProduct, Product, CountItemProduct, Sale, Article, Brand, Review, Order
from rest_framework.pagination import LimitOffsetPagination


# Create your views here.

class StyledComponentsListView(ListAPIView):
    queryset = StyledComponents.objects.filter(is_active=True)
    serializer_class = StyledComponentsSerializer


class LinkComponentsListView(ListAPIView):
    queryset = SetErrorLink.objects.filter(is_active=True)
    serializer_class = LinkComponentsSerializer


class StyledComponentsListView(ListAPIView):
    queryset = StyledComponents.objects.filter(is_active=True)
    serializer_class = StyledComponentsSerializer


class LinkComponentsListView(ListAPIView):
    queryset = SetErrorLink.objects.filter(is_active=True)
    serializer_class = LinkComponentsSerializer


class ProductPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 30


class ArticlesPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 30


class AnimalsListView(ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_animals_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryProductsListView(ListAPIView):
    queryset = CategoryProduct.objects.all()
    serializer_class = CategoryProductSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_category_products_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ProductsListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_products_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CountItemProductsListView(ListAPIView):
    queryset = CountItemProduct.objects.all()
    serializer_class = CountItemProductSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_count_item_products_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SaleListView(ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_sales_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ArticlesListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticlesPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_articles_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BrandsListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_brands_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReviewsListView(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_reviews_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class OrdersListView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_orders_list", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# API for Filter


class ProductListFilterView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        data = self.request.query_params
        print(data)
        d = dict(data.copy())
        print(d)
        order = d.pop("order")
        if data.get('sale__percent__gt'):
            d['sale__percent__gt'] = d.get('sale__percent__gt')[0]
        queryset = Product.objects.filter(**d).order_by(order[0])
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_code = "0"
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            error_queryset = SetErrorDataApiV1.objects.filter(url_name="get_products_filter", is_active=True)
            if error_queryset:
                if error_queryset[0].error_status_code != "0":
                    status_code = error_queryset[0].error_status_code
            if error_queryset:
                error_obj_from_bd = eval(error_queryset[0].section_error)
                response_list = []
                for i in queryset:
                    obj = {}
                    item_to_dict = model_to_dict(i)
                    for key in error_obj_from_bd:
                        obj[key] = item_to_dict.get(key, "Hi) guys!! Привет от Johana:))) ищи ошибку )")
                    response_list.append(obj)
                response = self.get_paginated_response(response_list)
                response.status_code = int(status_code)
                return response
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)