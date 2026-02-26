from .models import Expense, Staff, Department, Payroll, Message
from .serializers import ExpenseSerializer, StaffSerializer, DepartmentSerializer, PayrollSerializer, MessageSerializer
from rest_framework import viewsets
from accounts.permissions import IsDoctor, IsDoctorOrCreateOnly, IsDoctorOrStaffCreateOnly, IsDoctorOrStaffReadOnly


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsDoctorOrStaffCreateOnly]


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.filter()
    serializer_class = DepartmentSerializer
    permission_classes = [IsDoctorOrStaffReadOnly]


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsDoctor]


class PayrollViewSet(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [IsDoctor]



class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    permission_classes = [IsDoctorOrCreateOnly]
    serializer_class = MessageSerializer
