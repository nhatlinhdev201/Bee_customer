# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**
-keep public class com.horcrux.svg.** {*;}

# Loại bỏ các SDK quảng cáo Google Play Services (AdMob, Google Ads)
-dontwarn com.google.android.gms.ads.**
-dontwarn com.google.ads.**

# Nếu không sử dụng AdMob hoặc Google Ads, loại bỏ chúng hoàn toàn
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Loại bỏ các SDK quảng cáo của Firebase (Firebase Analytics)
-dontwarn com.google.firebase.analytics.**
-dontwarn com.google.firebase.crashlytics.**

# Loại bỏ quyền AD_ID khỏi ứng dụng nếu không sử dụng
-dontwarn com.google.android.gms.permission.AD_ID

# Loại bỏ các SDK quảng cáo của bên thứ ba (nếu có sử dụng)
-dontwarn com.facebook.ads.**
-dontwarn com.flurry.android.**
-dontwarn com.chartboost.sdk.**

# Giữ lại các lớp cần thiết của Firebase Realtime Database (nếu sử dụng)
#-keep class com.google.firebase.database.** { *; }

# Nếu không sử dụng các dịch vụ Firebase khác, bạn có thể loại bỏ chúng như sau:
# Loại bỏ Firebase Cloud Messaging (FCM) nếu không sử dụng
#-dontwarn com.google.firebase.messaging.**

# Loại bỏ các SDK quảng cáo của Google khác, ví dụ: Firebase AdMob, Google Ads SDK
-dontwarn com.google.firebase.ads.**

# Nếu bạn không sử dụng Facebook Ads, Flurry hoặc Chartboost, loại bỏ chúng
-dontwarn com.facebook.ads.**
-dontwarn com.flurry.android.**
-dontwarn com.chartboost.sdk.**