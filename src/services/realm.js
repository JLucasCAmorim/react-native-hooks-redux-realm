import Realm from 'realm';

import RepositoryShema from '~/shemas/RepositoryShema';

export default function getRealm() {
  return Realm.open({
    schema: [RepositoryShema.shema],
  });
}
