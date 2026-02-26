import os
from dotenv import load_dotenv

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, '.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
# ]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'r(6$p=#n=b8^-2u#pq)+=1(xpbb%69k_$)f+=gm!l^6wn3=y-s')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DJANGO_DEBUG', 'True').lower() == 'true'


def _csv_env(name, default=''):
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(',') if item.strip()]


ALLOWED_HOSTS = _csv_env('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Custom application
    "accounts",
    "Departments",
    "Patients",
    "Dashboard",
    # for REST API
    'rest_framework',
    # 3rd party Applications
    'corsheaders',
    'knox',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # added middleware for cors-header
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ReactDjango.urls'
WSGI_APPLICATION = 'ReactDjango.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ReactDjango.wsgi.application'



# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases


DB_ENGINE = os.getenv('DB_ENGINE', 'django.db.backends.mysql')
DB_NAME = os.getenv('DB_NAME', 'hospital_store')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'mysql')
DB_HOST = os.getenv('DB_HOST', '127.0.0.1')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_SSLMODE = os.getenv('DB_SSLMODE', '')
DB_SSLCERT = os.getenv('DB_SSLCERT', '')
DB_SSLKEY = os.getenv('DB_SSLKEY', '')
DB_SSLROOTCERT = os.getenv('DB_SSLROOTCERT', '')


def _existing_file(path_value):
    clean_path = str(path_value).strip().strip('"').strip("'")
    return clean_path if clean_path and os.path.isfile(clean_path) else ''


DB_SSLCERT = _existing_file(DB_SSLCERT)
DB_SSLKEY = _existing_file(DB_SSLKEY)
DB_SSLROOTCERT = _existing_file(DB_SSLROOTCERT)

database_options = {}
if 'postgresql' in DB_ENGINE:
    if DB_SSLMODE:
        database_options['sslmode'] = DB_SSLMODE
    if DB_SSLCERT:
        database_options['sslcert'] = DB_SSLCERT
    if DB_SSLKEY:
        database_options['sslkey'] = DB_SSLKEY
    if DB_SSLROOTCERT:
        database_options['sslrootcert'] = DB_SSLROOTCERT
elif 'mysql' in DB_ENGINE and DB_SSLMODE:
    # Aiven MySQL requires SSL; pass mysqlclient-compatible SSL options.
    ssl_options = {}
    if DB_SSLROOTCERT:
        ssl_options['ca'] = DB_SSLROOTCERT
    if DB_SSLCERT:
        ssl_options['cert'] = DB_SSLCERT
    if DB_SSLKEY:
        ssl_options['key'] = DB_SSLKEY
    database_options['ssl'] = ssl_options

DATABASES = {
    'default': {
        'ENGINE': DB_ENGINE,
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
        'OPTIONS': database_options,
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/


STATICFILES_DIRS = []
build_static_dir = os.path.join(BASE_DIR, "build/static")
if os.path.isdir(build_static_dir):
    STATICFILES_DIRS.append(build_static_dir)
STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'ReactDjango')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Allow local frontend dev servers and deployed site.
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5174",
#     "http://127.0.0.1:5173",
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
#     "http://purityclinic.herokuapp.com",
# ]

# Backward compatibility for older django-cors-headers versions.
# CORS_ORIGIN_WHITELIST = CORS_ALLOWED_ORIGINS

CORS_ALLOWED_ORIGINS = _csv_env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')
CORS_ALLOWED_ORIGIN_REGEXES = _csv_env('CORS_ALLOWED_ORIGIN_REGEXES', '')
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'False').lower() == 'true'
# Backward compatibility for django-cors-headers 3.1.1
CORS_ORIGIN_WHITELIST = CORS_ALLOWED_ORIGINS
CORS_ORIGIN_REGEX_WHITELIST = CORS_ALLOWED_ORIGIN_REGEXES
CORS_ORIGIN_ALLOW_ALL = CORS_ALLOW_ALL_ORIGINS
REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    #     'rest_framework.permissions.AllowAny',
    # ],
    'DEFAULT_AUTHENTICATION_CLASSES': ("knox.auth.TokenAuthentication",)
}


# user for django-rest-auth-registration
SITE_ID = 1


# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# AUTH_USER_MODEL = 'dashboard.User'
# ACCOUNT_UNIQUE_EMAIL = True
# CSRF_COOKIE_NAME = "csrftoken"
# ACCOUNT_AUTHENTICATION_METHOD = 'username'
# ACCOUNT_EMAIL_VERIFICATION = 'none'
