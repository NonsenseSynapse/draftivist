# Generated by Django 3.0.8 on 2021-02-03 05:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(null=True, upload_to='images/')),
                ('category', models.CharField(choices=[('COVER', 'Cover'), ('ISSUE', 'Cover'), ('THUMBNAIL', 'Thumbnail'), ('CUSTOM', 'Custom')], default='CUSTOM', max_length=20, null=True)),
                ('campaign', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images', to='api.Campaign')),
            ],
            options={
                'db_table': 'image',
                'ordering': ['id'],
            },
        ),
    ]
