export function excludeIdentifierFields(form) {
  const { id, userId, ...fields } = form;
  return fields;
}

export async function saveEntity({ service, entityId, fields, onSuccess, onError }) {
  try {
    if (entityId) {
      await service.update(entityId, fields);
    } else {
      await service.create(fields);
    }
    await onSuccess();
  } catch (error) {
    onError(error.message);
  }
}
