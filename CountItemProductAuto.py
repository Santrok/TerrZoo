
# Создает много записей в таблице CountItemProduct
# ---------------------------------------
# products = Product.objects.all()
# for product in products:
#
#     unit_list = ['кг', 'шт']
#     category_list = ['Древесный', 'Сухой корм', 'Влажный корм', 'Сено', 'Впитывающий',
#                      'Корм для рыб', 'Комкующийся', 'Песок']
#     if str(product.category) in category_list:
#         count = random.randint(1, 6)
#         for i in range(count):
#             value = round(random.uniform(0.1, 15), 1)
#             weight = CountItemProduct(product=product,
#                                       count=int(random.randint(1, 100)),
#                                       value=value,
#                                       unit=unit_list[0],
#                                       percent=value * 100)
#             weight.save()
#     else:
#         weight = CountItemProduct(product=product,
#                                   count=int(random.randint(1, 100)),
#                                   value=1,
#                                   unit=unit_list[1],
#                                   percent=100)
#         weight.save()
# ---------------------------------------
