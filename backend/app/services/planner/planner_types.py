from enum import Enum


class Intent(str, Enum):

    GENERAL = "general"

    COLLEGE = "college"

    WEBSITE = "website"

    DATABASE = "database"

    DOCUMENT = "document"

    IMAGE = "image"

    SMALL_TALK = "small_talk"

    UNKNOWN = "unknown"