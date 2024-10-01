export abstract class AuditableModel {
  private id: number | undefined;
  private created_at: Date | null;
  private updated_at: Date | null;

  constructor() {
    this.created_at = new Date();
    this.updated_at = null;
  }

  getCreatedAt(): Date | null {
    return this.created_at;
  }

  setUpdatedAt(value: Date) {
    this.updated_at = value;
  }

  getUpdatedAt(): Date | null {
    return this.updated_at;
  }
}
