# Generated by Django 4.0.3 on 2023-07-25 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='automobilevo',
            options={'verbose_name': 'Automobile VO', 'verbose_name_plural': 'Automobile VOs'},
        ),
        migrations.AlterModelOptions(
            name='technician',
            options={'verbose_name': 'Technician', 'verbose_name_plural': 'Technicians'},
        ),
    ]
