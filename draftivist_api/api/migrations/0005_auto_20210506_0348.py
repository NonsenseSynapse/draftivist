# Generated by Django 3.0.8 on 2021-05-06 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210208_0338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='category',
            field=models.CharField(choices=[('COVER', 'Cover'), ('CUSTOM', 'Custom')], default='CUSTOM', max_length=100, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='image',
            unique_together={('campaign', 'category')},
        ),
    ]
