import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something
from service_rest.models import AutomobileVO


def poll(repeat=True):
    while True:
        print("Sales poller polling for data")
        try:
            url = "http://project-beta-car-car-inventory-api-1:8000/api/automobiles/"
            r = requests.get(url)
            content = json.loads(r.content)
            # print("----->>> Content", content)
            autos_exist = AutomobileVO.objects.all()
            main_list = []
            existing_list = []
            # print("----->>> Autos Exists", autos_exist)

            for auto in autos_exist:
                # print("...auto exists in VO", auto.vin)
                existing_list.append(auto.vin)

            for auto in content["autos"]:
                # print("main auto", auto)
                main_list.append(auto["vin"])
            # print("exisiting vin list", existing_list)
            # print("main list list", main_list)

            # check
            for auto in existing_list:
                if auto not in main_list:
                    print("deleting", auto)
                    AutomobileVO.objects.get(vin=auto).delete()

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
