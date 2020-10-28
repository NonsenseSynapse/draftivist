from enum import Enum


class ChoicesEnum(Enum):
    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class SocialMediaSource(ChoicesEnum):
    FACEBOOK = 'FACEBOOK'
    TWITTER = 'TWITTER'
    INSTAGRAM = 'INSTAGRAM'


class MediaType(ChoicesEnum):
    COVER_PHOTO_DESKTOP = 'COVER_PHOTO_DESKTOP'
    COVER_PHOTO_MOBILE = 'COVER_PHOTO_MOBILE'
