from django.urls import path
from .views import BankList, BranchList, BranchInfoDetail

app_name = "banks"

urlpatterns = [
    path("", BankList.as_view(), name="bank-list"),
    path("<str:bank_code>/branches/", BranchList.as_view(), name="branch-list"),
    path("<str:bank_code>/<str:branch_code>/<str:branch_name>/", BranchInfoDetail.as_view(), name="branch-detail"),
]