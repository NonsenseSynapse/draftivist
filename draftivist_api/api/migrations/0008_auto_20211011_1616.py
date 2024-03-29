# Generated by Django 3.2.8 on 2021-10-11 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210926_2248'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('short_name', models.CharField(max_length=20)),
                ('created', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'organization',
            },
        ),
        migrations.RenameField(
            model_name='recipient',
            old_name='full_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='campaign',
            name='group',
        ),
        migrations.AddField(
            model_name='campaign',
            name='organization',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='campaigns', to='api.organization'),
        ),
        migrations.AddField(
            model_name='recipient',
            name='organization',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recipients', to='api.organization'),
        ),
    ]
