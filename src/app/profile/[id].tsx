import { router, useGlobalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import UserApi from '@/apis/UserApi';
import LoadingAnimation, {
  LoadingAnimationRef,
} from '@/components/common/animation/LoadingAnimation';
import CardMainProfile from '@/components/common/CardMainProfile';
import LayoutView from '@/components/common/LayoutView';
import { UserModal } from '@/modals/common/user';
import Tools from '@/utils/Tools';

const ProfileDetailScreen = () => {
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<UserModal | null>(null);
  const loadingRef = useRef<LoadingAnimationRef>(null);

  useEffect(() => {
    loadingRef.current?.open();
    UserApi.getUserById(`${id}`)
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          router.back();
        }
        loadingRef.current?.close();
      })
      .catch(() => loadingRef.current?.close());
  }, [id]);

  return (
    <LayoutView statusBarTranslucent>
      <CardMainProfile
        hiddenQr
        title={Tools.templateString`${user?.firstName} ${user?.lastName}`}
        username={user?.username}
      />
      <LoadingAnimation ref={loadingRef} />
    </LayoutView>
  );
};

export default ProfileDetailScreen;
