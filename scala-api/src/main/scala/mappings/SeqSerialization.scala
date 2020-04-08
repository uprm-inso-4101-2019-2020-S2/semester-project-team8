package mappings

import spray.json._

trait SeqSerialization extends CollectionFormats {

  import collection.{immutable => imm}

  override def viaSeq[I <: Iterable[T], T :JsonFormat](f: imm.Seq[T] => I): RootJsonFormat[I] = new RootJsonFormat[I] {
    def write(iterable: I) = {
      if (iterable.isEmpty)
        JsArray(Vector())
      else { JsArray(iterable.map(_.toJson).toVector) }
    }
    def read(value: JsValue) = value match {
      case JsArray(elements) => f(elements.map(_.convertTo[T]))
      case JsNull => f(List.empty)
      case x => deserializationError("Expected Collection as JsArray, but got " + x)
    }
  }

}
