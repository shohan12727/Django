import ollama
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

from .models import PatientReport
from .serializers import PatientReportSerializer


@csrf_exempt
@api_view(["POST"])
def generate_patient_summary(request):
    try:
        patient_name = request.data.get("patient_name")
        symptoms = request.data.get("symptoms")
        diagnosis = request.data.get("diagnosis", "")

        if not patient_name or not symptoms:
            return Response(
                {"error": "patient_name and symptoms are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Build prompt
        prompt = f"""
        You are a medical assistant AI. Based on the following patient information,
provide a brief summary and actionable health suggestions.

Patient Name: {patient_name}
Symptoms: {symptoms}
Diagnosis: {diagnosis if diagnosis else 'Not provided'}

Please respond in this exact format:

SUMMARY:
- <concise point 1 about the patient's condition>
- <concise point 2 about the patient's condition>
- <concise point 3 about the patient's condition>

SUGGESTIONS:
- <actionable suggestion 1>
- <actionable suggestion 2>
- <actionable suggestion 3>
- <actionable suggestion 4>
- <actionable suggestion 5>

Return **only** this formatted text. Do not add any explanations or extra text.
        """

        # Call Ollama
        response = ollama.chat(
            # model="fredrezones55/Jan-code:Q4_K_M",
            model="llama3.1:latest",
            messages=[{"role": "user", "content": prompt}],
        )

        # ✅ Correct attribute access
        ai_text = response.message.content

        # Parse summary and suggestions
        ai_summary = ""
        ai_suggestion = ""

        if "SUMMARY:" in ai_text and "SUGGESTIONS:" in ai_text:
            parts = ai_text.split("SUGGESTIONS:")
            ai_summary = parts[0].replace("SUMMARY:", "").strip()
            ai_suggestion = parts[1].strip()
        else:
            ai_summary = ai_text
            ai_suggestion = "Please consult a doctor for personalized advice."

        # Save to DB
        report = PatientReport.objects.create(
            patient_name=patient_name,
            symptoms=symptoms,
            diagnosis=diagnosis,
            ai_summary=ai_summary,
            ai_suggestion=ai_suggestion,
        )

        serializer = PatientReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_patient_reports(request):
    reports = PatientReport.objects.all().order_by("-created_at")
    serializer = PatientReportSerializer(reports, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


