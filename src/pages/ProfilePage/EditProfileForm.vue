<template>
  <q-card class="myCardClass" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs inputClass" style="width: 100%;">
          <div class="text-h6">{{$t("Basic information")}}</div>
          <q-card-section horizontal style="flex-wrap:wrap;">
            <q-input :label="$t('First Name')" v-model="userProfile.given_name" style="width: 45%;" />
            <q-input :label="$t('Last Name')"  v-model="userProfile.family_name" style="width: 45%;" />
            <q-input :label="$t('Date of Birth')"  v-model="userProfile.birthday" style="width: 45%;" />
            <q-input :label="$t('Gender_MALE_FEMALE')" v-model="userProfile.gender" style="width: 45%;" />
          </q-card-section>
          <div class="text-h6">{{$t("Communicate information")}}</div>
          <q-card-section horizontal style="flex-wrap:wrap;">
            <q-input :label="$t('Email')" v-model="userProfile.email" style="width: 45%;" :disable="true" />

          </q-card-section>
          <q-card-section horizontal>
            <q-input :label="$t('Address')" v-model="userProfile.address" style="width: 45%;" />

          </q-card-section>
        </q-card-section>
        <q-separator vertical />
        <q-card-section class="col-5 flex flex-center" style="display:none;">
          <q-img
            class="rounded-borders"
            :src="userProfile.picture"
            style="width: 50vh; height: 50vh; border-radius: 50%;"
          />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="justify-center">
        <q-btn flat color="primary" style="width: 100%;" @click="submit">
          {{$t("Submit")}}
        </q-btn>
      </q-card-actions>
    </q-card>
</template>
<script>
import {
  defineComponent,
  ref,
  unref,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useUserStore } from "stores/user";
import { updateProfile } from 'src/api/profile'
import {
  Notify
} from "quasar"
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'
export default defineComponent({
  name: "EditProfileForm",
  setup() {
    const userstore = useUserStore();
    const user = userstore.getUser;
    const userProfile = ref(_cloneDeep(user.profile));
    // format birthday
    const dateObject = new Date(userProfile.value.birthday);
    const formattedDate = `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;
    userProfile.value.birthday = formattedDate

    const submit = async () => {
      if (!_isEqual(unref(userProfile), userstore.getUser.profile)) {
        try {
          console.log(userProfile)
          const response = await updateProfile({id: user.id , profile: unref(userProfile)})
          userstore.setProfile(response)
          Notify.create({
          message:  'Thành công!',
          color: 'primary',
          icon: 'check_circle'
        })
        } catch (e) {
          Notify.create({
            message:  'Lỗi định dạng!',
            type: "negative",
          })
          console.log(e)
        }
      }
    };
    return {
      userProfile,
      submit,
    };
  },
});
</script>
<style lang="scss" scoped>
.inputClass {
  .q-card__section--horiz {
    gap: 50px;
    margin-bottom: 5px;
  }
}
</style>
