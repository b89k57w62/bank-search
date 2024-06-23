from rest_framework import generics
from .models import Bank, Branch
from .serializers import BankSerializer, BranchSerializer

class BankList(generics.ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class BranchList(generics.ListAPIView):
    serializer_class = BranchSerializer
    
    def get_queryset(self):
        bank_code = self.kwargs["bank_code"]
        bank = Bank.objects.get(code=bank_code)
        return bank.branches.all()
    
class BranchInfoDetail(generics.RetrieveAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

    def get_queryset(self):
        bank_code = self.kwargs.get("bank_code")
        branch_code = self.kwargs.get('branch_code')
        branch_name = self.kwargs.get('branch_name')
        bank = Bank.objects.get(code=bank_code)
        obj = bank.branches.filter(code=branch_code, name=branch_name).first()
        return obj
    