from rest_framework import serializers
from .models import Bank, Branch


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"

class BranchSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    bank = BankSerializer()

    class Meta:
        model = Branch
        fields = "__all__"

    def get_url(self, obj):
        request = self.context.get("request")
        branch_name = obj.name
        return request.build_absolute_uri(f"/{obj.bank.code}/{obj.code}/{branch_name}")