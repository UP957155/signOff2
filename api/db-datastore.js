const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'assessment' });

const kind = 'registers';

//generate ID(key)
function key(id) {
  return ds.key([kind, id]);
}

//query for list of entities with specific ID(key)
module.exports.list = async (name) => {
  let [data] = await ds.createQuery(kind).filter('__key__', '=', key(name)).order('name').run();
  return data;
};

//query to save entity into database
module.exports.put = async (obj) => {
  const entity = {
    key: key(obj.name),
    data: obj,
  }
  await ds.save(entity);
};

//query to delete entity from database
module.exports.delete = async (name) => {
    await ds.delete(key(name));
};