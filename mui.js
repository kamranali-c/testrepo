from alembic import op
import sqlalchemy as sa

def upgrade() -> None:
    with op.batch_alter_table('incident_requests', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('majorIncidentState', sa.String(), nullable=True, server_default='unprocessed')
        )
    print("✅ Added column 'majorIncidentState' via batch_alter_table")

def downgrade() -> None:
    with op.batch_alter_table('incident_requests', schema=None) as batch_op:
        batch_op.drop_column('majorIncidentState')
    print("🗑️ Dropped column 'majorIncidentState'")
