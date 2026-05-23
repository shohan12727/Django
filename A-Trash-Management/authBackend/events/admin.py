from django.contrib import admin
from .models import EventCategory, EventTag, Events, EventRegistration, EventFeedback


@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(EventTag)
class EventTagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "organizer",
        "category",
        "event_type",
        "status",
        "is_public",
        "start_time",
        "created_at",
    )
    list_display_links = ("title",)
    list_filter = ("status", "event_type", "is_public", "category", "created_at")
    search_fields = ("title", "description", "organizer__username")
    
    # FIXED: Removed the stray question mark here
    prepopulated_fields = {"slug": ("title",)}
    
    filter_horizontal = ("tags",)
    list_select_related = ("category", "organizer")
    
    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug", "description", "banner")
        }),
        ("Relations & Taxonomy", {
            "fields": ("category", "tags", "organizer")
        }),
        ("Logistics", {
            "fields": ("event_type", "location", "max_participants")
        }),
        ("Dates & Status", {
            "fields": ("registration_deadline", "start_time", "end_time", "is_public", "status")
        }),
    )


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ("user", "event", "status", "registration_at")
    list_filter = ("status", "registration_at", "event")
    search_fields = ("user__username", "event__title")
    list_select_related = ("user", "event")


@admin.register(EventFeedback)
class EventFeedbackAdmin(admin.ModelAdmin):
    list_display = ("user", "event", "rating", "created_at")
    list_filter = ("rating", "created_at", "event")
    search_fields = ("user__username", "event__title", "comment")
    list_select_related = ("user", "event")