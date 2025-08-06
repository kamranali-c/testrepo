from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

def upgrade() -> None:
    """Upgrade schema."""
    conn = op.get_bind()
    columns = [c['name'] for c in inspect(conn).get_columns('incident_requests')]
    print("🔍 Existing columns in 'incident_requests':", columns)

    if 'majorIncidentState' not in columns:
        print("➕ Adding column 'majorIncidentState'...")
        op.add_column(
            'incident_requests',
            sa.Column('majorIncidentState', sa.String(), server_default='unprocessed', nullable=False)
        )
    else:
        print("⚠️ Column 'majorIncidentState' already exists — skipping.")


def downgrade() -> None:
    """Downgrade schema."""
    conn = op.get_bind()
    columns = [c['name'] for c in inspect(conn).get_columns('incident_requests')]
    print("🔍 Existing columns before downgrade:", columns)

    if 'majorIncidentState' in columns:
        print("🗑️ Dropping column 'majorIncidentState'...")
        op.drop_column('incident_requests', 'majorIncidentState')
    else:
        print("⚠️ Column 'majorIncidentState' not found — nothing to drop.")
