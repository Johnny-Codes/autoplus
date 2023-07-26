import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def poll(repeat=True):
    while True:
        print("Sales poller polling for data")
        try:
            url = "http://project-beta-car-car-inventory-api-1:8000/api/automobiles/"
            r = requests.get(url)
            content = json.loads(r.content)
            for auto in content["autos"]:
                try:
                    obj = AutomobileVO.objects.get(vin=auto["vin"])
                    obj.sold = auto["sold"]
                    obj.save()
                except AutomobileVO.DoesNotExist:
                    obj = AutomobileVO(vin=auto["vin"], sold=auto["sold"])
                    obj.save()
            pass
        except Exception as e:
            print(e, file=sys.stderr)

        if not repeat:
            break

        time.sleep(1)


if __name__ == "__main__":
    poll()
