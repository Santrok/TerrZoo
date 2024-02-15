from django.urls import path

from .views import AnimalsListView, CategoryProductsListView, ProductsListView, \
    CountItemProductsListView, SaleListView, ArticlesListView, BrandsListView, ReviewsListView, OrdersListView, \
    ProductListFilterView, StyledComponentsListView, LinkComponentsListView

urlpatterns = [
    path("get_bugs_css/", StyledComponentsListView.as_view()),
    path("get_bugs_link/",LinkComponentsListView.as_view()),
    path("get_animals_list/", AnimalsListView.as_view()),
    path("get_category_products_list/", CategoryProductsListView.as_view()),
    path("get_products_list/", ProductsListView.as_view()),
    path("get_count_item_products_list/", CountItemProductsListView.as_view()),
    path("get_sales_list/", SaleListView.as_view()),
    path("get_articles_list/", ArticlesListView.as_view()),
    path("get_brands_list/", BrandsListView.as_view()),
    path("get_reviews_list/", ReviewsListView.as_view()),
    path("get_orders_list/", OrdersListView.as_view()),
    path("get_products_filter/", ProductListFilterView.as_view())
]
