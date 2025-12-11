from django.core.cache import cache
from django.core.management.base import BaseCommand

from project.routedb.models import Route


class Command(BaseCommand):
    help = "Remove image cache"

    def handle(self, *args, **options):
        qs = Route.objects.all()
        for r in qs:
            cache.delete(f"route:{r.images_path}:0:0")
            cache.delete(f"route:{r.images_path}:1:0")
            cache.delete(f"route:{r.images_path}:1:1")
            cache.delete(f"route:{r.images_path}:0:1")
            cache.delete(f"map:thumbnail:{r.raster_map.image.name}")
            cache.delete(f"map:og-thumbnail:{r.raster_map.image.name}")
        self.stdout.write(self.style.SUCCESS("Done"))
