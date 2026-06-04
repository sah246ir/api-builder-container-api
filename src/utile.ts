export function mongoSafe(data: any) {
    return JSON.parse(
      JSON.stringify(data, (_, value) => {
        if (typeof value === "bigint") return value.toString()
        if (value?._bsontype === "ObjectID") return value.toString()
        if (value?._bsontype === "Decimal128") return value.toString()
        return value
      })
    )
  }
  