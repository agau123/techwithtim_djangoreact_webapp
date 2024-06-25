from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView
from api.views import CreateUserView


urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/user/register/', CreateUserView.as_view(), name='register'),
  path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
  path('api/token/refresh/', TokenRefreshSlidingView.as_view(), name='refresh'),
  path('api-auth/', include('rest_framework.urls')),
  path('api/', include('api.urls')),
]
