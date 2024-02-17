from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def total_price(context, percent, price):
    """Метод расчета цены в зависимости
     от веса в процентном соотношении"""

    result = float(percent) / 100 * float(price)
    result = float((format(result, '.2f')))
    return result
